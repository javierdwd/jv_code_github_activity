import React from 'react';
import Commit from './Commit';

function Repository(props) {
  const {
    name,
    id,
    url,
    description,
    commits,
    commitListUrl,
  } = props;

  return (
    <article className="c-git-activity__repository c-git-repository">
      <h1 className="c-git-repository__name">
        <a
          href={url}
          className="c-git-repository__link"
          rel="noopener noreferrer"
          target="_blank">
          {name}
        </a>
      </h1>
      <p className={"c-git-repository__description"}>
        {description}
      </p>

      {(commits && commits.length) ? (
        <div className="c-git-activity__commits">
          {
            commits.map(x => {
              return (
                <Commit
                key={x.id}
                {... x}
              />
              )
            })
          }
          <a
            href={commitListUrl}
            className="c-git-repository__commits-all"
            rel="noopener noreferrer"
            target="_blank">
            View all
          </a>
        </div>
      ) : null}

    </article>
  );
}

export default Repository;