<svelte:head>
	<title>Color ID - Privacy Policy</title>
</svelte:head>

<article>
	<h1>Privacy Policy</h1>

	<p class="muted">Last updated: 25 November 2026</p>

	<h2>Summary</h2>
	<p>
		Color ID runs entirely in your browser. It does not use cookies, local storage, tracking scripts
		or any content from third parties. The only personal data processed is what every web server
		sees when you visit a page: the server logs described below.
	</p>

	<h2>Who is responsible</h2>
	<p>
		Tim Jentzsch<br />
		<!-- TODO: postal address (required) -->
		[Street and number]<br />
		[Postcode and city], Germany<br />
		<!-- TODO: contact email (required) -->
		Email: [contact email]
	</p>

	<h2>Server logs</h2>
	<p>When you open this website, our web server records for each request:</p>
	<ul>
		<li>the website and page requested, and the time of the request</li>
		<li>the HTTP status code and amount of data transferred</li>
		<li>the referring page (if your browser sends it)</li>
		<li>your browser's user agent (browser and operating system)</li>
		<li>
			a <strong>shortened IP address</strong>: the last part is removed before anything is written
			to disk (IPv4: last of four blocks; IPv6: everything after the first three blocks), so it
			cannot be traced back to your connection
		</li>
	</ul>
	<p>
		From the shortened IP address we derive the approximate <strong>country</strong>, using a
		database stored on our own server (“IP to Country Lite” by DB-IP). No data is sent to a third
		party for this.
	</p>
	<p>
		We use this data to keep the website running securely and to create anonymous visitor statistics
		(for example, how many people visit which page and from which countries). The statistics are
		only visible to us. The data is not combined with other data and is not used to identify
		individuals.
	</p>
	<p>
		The legal basis is our legitimate interest in operating a secure website and understanding how
		it is used (Art. 6(1)(f) GDPR). Server logs are deleted automatically after
		<strong>90 days</strong>.
	</p>
	<p>
		In addition, the web server keeps a separate error log for technical failures. Entries in it can
		contain the full IP address. It is used only for troubleshooting and is deleted automatically
		after <strong>7 days</strong>.
	</p>

	<h2>Hosting</h2>
	<p>
		This website is hosted on a server of Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen,
		Germany, located in Germany. Hetzner processes data only on our behalf under a data processing
		agreement (Art. 28 GDPR).
	</p>

	<h2>Links to other websites</h2>
	<p>
		This website links to GitHub. No data is sent to GitHub when you load this website; the GitHub
		privacy policy only applies once you follow such a link.
	</p>

	<h2>Your rights</h2>
	<p>Under the GDPR you have the right to:</p>
	<ul>
		<li>access the personal data we hold about you (Art. 15)</li>
		<li>have it corrected (Art. 16) or deleted (Art. 17)</li>
		<li>restrict its processing (Art. 18)</li>
		<li>
			<strong>object</strong> at any time to processing based on our legitimate interest, on grounds relating
			to your particular situation (Art. 21)
		</li>
		<li>lodge a complaint with a data protection supervisory authority (Art. 77)</li>
	</ul>
	<p>
		Because IP addresses are shortened before they are stored, we usually cannot tell which log
		entries belong to you. If you contact us, we will do our best to help.
	</p>
</article>

<style>
	article {
		max-width: 45rem;
		margin: 0 auto;
		padding: 0 5px 20px;
		line-height: 1.5;
	}

	.muted {
		color: var(--muted-color);
	}

	li {
		margin: 0.25em 0;
	}
</style>
