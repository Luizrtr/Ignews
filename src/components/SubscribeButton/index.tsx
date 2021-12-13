import { useSession, signIn } from "next-auth/client";
import styles from "./styles.module.scss";

interface SubscrisbeButtonProps {
  priceId: string;
}

// Os três lugares que devem ser usadas as credenciais(back-end)
// getServerSideProps (SSR)
// getStaticProps (SSG)
// API routes

export function SubscribeButton({ priceId }: SubscrisbeButtonProps) {
  const [session] = useSession();

  function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
