import React from 'react';
import User from './components/User';
import Repository from './components/Repository';

const ENDPOINT = 'https://wt-7aae5801f0beb40510fbf7db372fc5c9-0.sandbox.auth0-extend.com/jv_code_git_repositories';

const getUserRepositories = async (useCache = true, cacheExpiration = 24) => {
  const cacheEnabled = useCache && window.localStorage;
  let localData;

  if(cacheEnabled) {
    localData = window.localStorage.getItem('gb-recent-activity');

    if(localData) {
      localData = JSON.parse(localData);
      let diffHours = Math.abs(localData.createdAt - Date.now()) / 3600000;

      if(parseInt(diffHours) <= cacheExpiration) {
        return localData.response;
      }
    }
  }

  const request = await fetch(ENDPOINT);
  const response = await request.json();

  if(cacheEnabled) {
    window.localStorage.setItem('gb-recent-activity', JSON.stringify({
      createdAt: Date.now(),
      response
    }));
  }

  return response;
};

const resolveQuery = async (data) => state => {
  const { ignoreRepository } = state;
  const result = {};

  result.user = {
    name: data.user.name,
    url: data.user.url
  };

  result.repositories = [];

  if(data.user.repositories) {
    data.user.repositories.edges.forEach(({ node }) => {
      if(ignoreRepository.indexOf(node.name) > -1) {
        return;
      }

      const repository = {
        name: node.name,
        id: node.id,
        url: node.url,
        description: node.description,
        commits: [],
      };

      try {
        repository.commitsTotalCount = node.defaultBranchRef.target.history.totalCount;
        repository.commitListUrl = `${node.url}/commits/${node.defaultBranchRef.name}`;

        const latestCommits = node.defaultBranchRef.target.history.edges;

        repository.commits = latestCommits.map(({ node }) => node);

      } catch(error) {
        console.log(error);
      }

      result.repositories.push(repository);
    });
  }

  return result;
};

class GithubActivity extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: null,
      user: null,
      repositories: null,
      errors: null,
      ignoreRepository: [],
      useCache: true,
      cacheExpiration: 6,

      ...props
    };
  }

  componentDidMount() {
     this.onFetchFromGithub();
  }

  async onFetchFromGithub() {
    try {
      const { data, errors = null } = await getUserRepositories(
        this.state.useCache,
        this.state.cacheExpiration
      );

      this.setState({errors});

      if(!errors) {
        this.setState(await resolveQuery(data));
      }

    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const {
      login,
      user,
      repositories,
      errors,
    } = this.state;

    return (
      <div className="c-git-activity">
        {errors && <div class="c-git-activity__error-msg">Unexpected error. Data could not be loaded.</div>}

        {!errors && user && (
          <User user={user} login={login} />
        )}

        {(repositories && repositories.length) ? (
          <section className="c-git-activity__repositories">
            {
              repositories.map(x => {
                return <Repository
                  key={x.id}
                  {... x}
                />
              })
            }
          </section>
        ) : <div className="c-git-activity__loading">Loading...</div> }
      </div>
    );
  }
}

export default GithubActivity;