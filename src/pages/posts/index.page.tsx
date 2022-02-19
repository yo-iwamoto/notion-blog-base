export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  };
};

export default function () {
  return null;
}
