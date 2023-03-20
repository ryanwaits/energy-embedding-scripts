# Node.js Template Repository

This template repository provides a simple and flexible structure for creating Node.js projects with TypeScript. It includes setup for Supabase, API calls, custom functions, text parsing, and more.

## Getting Started

1. Clone this repository or use it as a template for your new project:

```bash
git clone https://github.com/ryanwaits/node-template.git
```

2. Change into the project directory:

```bash
cd node-template
```

3. Install dependencies:

```bash
yarn install
```

4. Create a .env file in the project root to store your API keys and configuration:

```bash
OPEN_AI_KEY=<your-openai-key>
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Add any other required environment variables for your specific project.

5. Run your script:

```bash
yarn start
```

## Project Structure

- src/server: Directory for database configurations, such as Supabase.
- src/config: Directory for additional library configurations.
- src/lib: Directory for API calls, custom functions, text parsers, and any supporting code for the project.
- src/index.ts: Main file to run your scripts.

# Libraries and Packages

This repository uses various libraries and packages to facilitate the development process. Below is an overview of each package and its purpose.

### @supabase/supabase-js

A client library for interacting with the Supabase API. Supabase is a real-time, open-source alternative to Firebase.

- [GitHub](https://github.com/supabase/supabase)
- [NPM](https://www.npmjs.com/package/@supabase/supabase-js)

### @supercharge/promise-pool

A library to manage and limit the concurrency of Promise-based tasks.

- [GitHub](https://github.com/supercharge/promise-pool)
- [NPM](https://www.npmjs.com/package/@supercharge/promise-pool)

### cheerio

A fast, flexible, and lean implementation of core jQuery designed specifically for the server.

- [GitHub](https://github.com/cheeriojs/cheerio)
- [NPM](https://www.npmjs.com/package/cheerio)

### common-tags

A set of well-tested, commonly used template literal tag functions for use in JavaScript and TypeScript.

- [GitHub](https://github.com/declandewet/common-tags)
- [NPM](https://www.npmjs.com/package/common-tags)

### gpt3-tokenizer

A tokenizer library for GPT-3.

- [GitHub](https://github.com/yrk-ellow/gpt3-tokenizer)
- [NPM](https://www.npmjs.com/package/gpt3-tokenizer)

### openai

The official OpenAI API client for JavaScript.

- [GitHub](https://github.com/openai/openai)
- [NPM](https://www.npmjs.com/package/openai)

## Contributing

If you have any suggestions, improvements, or issues, feel free to open a pull request or an issue in the repository.

## License

MIT
