import PromisePool from '@supercharge/promise-pool';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

const filters = [
  'Center for Industrial Progress',
  'Home',
  'Overview',
  'Admin',
  'Sign Up',
];

export async function getHTML(url: string) {
  const res = await fetch(url);
  const html = await res.text();
  return html;
}

export async function getDocument(slug: string) {
  const url = 'https://energytalkingpoints.com/';
  const res = await fetch(url + slug);
  const html = await res.text();
  const $ = cheerio.load(html);
  const documents = [];
  const header = $('.content h1:first').text().trim();
  documents.push(header);
  $('.content p').each((i, el) => {
    const text = $(el).text().trim();
    documents.push(text);
  });
  $('.article-content ul li').each((i, el) => {
    const text = $(el).text().trim();
    documents.push(text);
  });
  const documentsWithSpaces = documents.map((doc) => doc.replace(/\n/g, ' '));
  return documentsWithSpaces;
}

export async function getDocuments(slugs: string[]) {
  const data = await PromisePool.for(slugs)
    .withConcurrency(10)
    .process(async (slug) => {
      return getDocument(slug);
    });

  return data.results;
}

export async function getSlugs() {
  const url = 'https://energytalkingpoints.com/';
  const res = await fetch(url);
  const html = await res.text();
  const $ = cheerio.load(html);
  const slugs = [];
  $('.menu-list li').each((i, m) => {
    $(m, 'li').each((i, el) => {
      const slug = $(el, 'a').text().trim();
      slugs.push(slug);
    });
  });
  const filteredSlugs = slugs
    .filter((slug) => !meetsCriteria(slug))
    .map(slugify);
  return filteredSlugs;
}

export function extractTitle(document) {
  return document[0];
}

function slugify(str) {
  return str.toLowerCase().replace(/[\s,]+/g, '-');
}

function meetsCriteria(str) {
  return filters.some((word) => str.includes(word));
}
