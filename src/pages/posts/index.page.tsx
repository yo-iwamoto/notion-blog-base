/**
 * @description always return redirect for user's comfortability
 */
export const getServerSideProps = () => {
  return {
    redirect: {
      permanent: true,
      destination: '/',
    },
  };
};

/**
 * @description alway return null because this Page will not be rendered
 */
export default function () {
  return null;
}
