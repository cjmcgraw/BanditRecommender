import SendEvent from '../../components/admin/SendEvent';
import withContentBandit, { getServerSidePropsHelper } from '../../components/ContentBanditHOC';

function sendEventView(props: any) {
  return (
    <div>
      <SendEvent
        content={{
          id: "123",
          creatorId: 123,
          source: "qq" ,
        }}
      />
    </div>
  )
}

// this is needed to allow the props to be filled
export const getServerSideProps = getServerSidePropsHelper;
export default withContentBandit(sendEventView);