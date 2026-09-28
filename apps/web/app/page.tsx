"use client";

import { FormEvent, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setShortUrl("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/urls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) throw new Error("Enter a valid URL and try again.");
      const result: { code: string } = await response.json();
      setShortUrl(`${apiUrl.replace(/\/api$/, "")}/api/urls/${result.code}`);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">LINKLET / URL SHORTENER</p>
        <h1>Make every link easier to share.</h1>
        <p className="lede">
          Turn long URLs into clean, memorable links that are ready for
          anywhere.
        </p>

        <form className="shorten-form" onSubmit={handleSubmit}>
          <label htmlFor="url">Paste your long URL</label>
          <div className="input-row">
            <input
              id="url"
              type="url"
              required
              placeholder="https://your-long-link.com/..."
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </form>

        {shortUrl && (
          <div className="result" role="status">
            <span>Your short link</span>
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </div>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </section>
      <footer>Simple links. Better reach.</footer>
    </main>
  );
}
