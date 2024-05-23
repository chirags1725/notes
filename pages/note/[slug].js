import { useRouter } from "next/router";

export default function Note({ slug }) {
  const router = useRouter();

  fetch(`/api/getnote?id=${slug}`)
    .then((a) => {
      return a.json();
    })
    .then((a) => {
      console.log(a);
    });

  return (
    <>
      <p
        style={{
          left: "0px",
          padding: "0px",
          margin: "0px",
          position: "absolute",
          background: "red",
        }}
      >
        Post: {router.query.slug}
      </p>{" "}
      ;
    </>
  );
}

export const getServerSideProps = async (context) => {
  // Fetch data from external API
  const { slug } = context.query;
  // Pass data to the page via props
  return { props: { slug } };
};
