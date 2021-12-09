import styles from "./styles.module.scss";

interface SubscrisbeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscrisbeButtonProps) {
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe Now
    </button>
  );
}
