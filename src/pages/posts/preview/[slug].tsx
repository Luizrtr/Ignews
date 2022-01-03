import { GetStaticProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";
interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updated: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews </title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updated}</time>
        </article>
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className={`${styles.postContent} ${styles.previewContent}`}
        />
        <div className={styles.continueReading}>
          Wanna continue reading?
          <Link href="/">
            <a>Subscribe now 🤗</a>
          </Link>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();

  const response = await prismic.getByUID("publication", String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
