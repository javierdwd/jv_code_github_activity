import React from 'react';
import User from './components/User';
import Repository from './components/Repository';

const getUserRepositories = async () => {
  const response =  require('./data/dataMockup1.json');

  return response;
};

const resolveQuery = async (data) => state => {
  const result = {};

  result.user = {
    name: data.user.name,
    url: data.user.url
  };

  result.repositories = [];

  if(data.user.repositories) {
    data.user.repositories.edges.forEach(({ node }) => {
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

      ...props
    };
  }

  componentDidMount() {
     this.onFetchFromGithub();
  }

  async onFetchFromGithub() {
    try {
      const { data, errors = null } = await getUserRepositories();

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

        {repositories && repositories.length && (
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
        )}
      </div>
    );
  }
}

export default GithubActivity;