import fs from 'fs';

async function fetchPage() {
  try {
    const response = await fetch('https://authority-placement.vercel.app/');
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    const html = await response.text();
    fs.writeFileSync('target_homepage.html', html);
    console.log('Successfully fetched homepage HTML and saved to target_homepage.html');
  } catch (error) {
    console.error('Error fetching page:', error);
  }
}

fetchPage();
