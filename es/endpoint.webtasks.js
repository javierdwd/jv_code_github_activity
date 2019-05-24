/**
* @param context {WebtaskContext}
*/
var request = require('request');

module.exports = function (context, req, res) {
  var QUERY = '\n    query ($user: String!, $commitsMax: Int!) {\n      rateLimit {\n        cost\n        remaining\n        resetAt\n      }\n      user(login: $user) {\n        name\n        url\n        repositories(isFork: false, privacy: PUBLIC, first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {\n          edges {\n            cursor\n            node {\n              name\n              id\n              url\n              description\n              pushedAt\n              defaultBranchRef {\n                id\n                name\n                target {\n                  id,\n                  commitResourcePath\n                  ... on Commit {\n                    history(first: $commitsMax) {\n                      totalCount\n                      pageInfo {\n                        startCursor\n                        endCursor\n                      }\n                      edges {\n                        cursor\n                        node {\n                          committedDate\n                          id\n                          message\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ';

  var requestOptions = {
    url: 'https://api.github.com/graphql',
    body: JSON.stringify({
      query: QUERY,
      variables: {
        user: context.query.user || "javierdwd",
        commitsMax: context.query.commitsMax || 6
      }
    }),
    headers: {
      'user-agent': 'node',
      'Authorization': 'bearer ' + context.secrets.GITHUB_ACCESS_TOKEN
    }
  };

  res.writeHead(200, { 'Content-Type': 'application/json ' });

  if (req.method === 'GET') {
    request.post('https://api.github.com/graphql', requestOptions, function (error, resp, body) {
      if (error) {
        res.write(error);
        res.end();
      }
      res.write(body);
      res.end();
    });
  }
};