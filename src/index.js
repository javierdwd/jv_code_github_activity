import React from 'react';
import User from './components/User'

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
        commits: []
      };

      try {
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
      <div className="github-activity">
        {errors && <div class="error">Unexpected error. Data could not be loaded.</div>}

        {!errors && user && (
          <div className="data">
            <User user={user} login={login} />
          </div>
        )}
      </div>
    );
  }
}

export default GithubActivity;