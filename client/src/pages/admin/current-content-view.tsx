import withContentBandit, { HOCProps, getServerSidePropsHelper } from '../../components/ContentBanditHOC';
import CurrentContentView from '../../components/admin/CurrentContentView';
import { CircularProgress, Container } from '@mui/material';
import lodash from 'lodash';
import React from 'react';
import { Content } from '../../types';
import { buildConsoleLogFn } from '../../utils';

const log = buildConsoleLogFn("current-content-view");

function View(props: HOCProps) {
  const next = props.getNext;

  const [content, setContent] = React.useState<Content[]>([]);
  React.useEffect(
    function loadInitialContent() {
      log("starting initial content load")
      const promises = Promise.all(
        lodash.range(10)
        .map(_i => next())
      )
      .then(
        (newContent) => {
          log(`found new content number of records=${newContent.length}`);
          const validContent = content.filter(x => x);
          if (validContent.length > 0) {
            log("setting content");
            setContent([...content, ...validContent]);
          }
        }
      )
    },
    []
  )
  log("rendering...");
  log(JSON.stringify(content));
  return (
    <Container>
      {
        (content.length <= 0) 
            ?  <CircularProgress/>
            : <div>
              <CurrentContentView
                content={content}
              />
            </div>
      }
    </Container>
  );
}

// this is needed to allow the props to be filled
export const getServerSideProps = getServerSidePropsHelper;
export default withContentBandit(View);