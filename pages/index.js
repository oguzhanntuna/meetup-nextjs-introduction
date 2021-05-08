import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//   // fetch data from API or DB
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from API or DB
  const client = await MongoClient.connect(
    "mongodb+srv://oguzhantuna:lincoln97@cluster0.efbwc.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(meetup =>({
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString()
      })),
    },
    revalidate: 1
  };
}

export default HomePage;
