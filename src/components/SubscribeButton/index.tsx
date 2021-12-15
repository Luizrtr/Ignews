import { useSession, signIn } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJS } from "../../services/stripe-js";

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

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response = await api.post("/subscribe");
      const { sessionId } = response.data;

      const stripe = await getStripeJS();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err.message);
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
