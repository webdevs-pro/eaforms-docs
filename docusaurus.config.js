// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'EA Forms',
  tagline: 'Advanced Form Builder for Elementor',
  favicon: 'img/favicon.ico',
  url: 'https://demo.eaforms.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // COMPLETELY REMOVE THE PRESET FIRST
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // Important: Make sure docs is false
        docs: false,
        blog: {
          showReadingTime: true,
          // Other blog settings...
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Add the plugins explicitly AFTER the preset
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorial',
        path: 'tutorials',  
        routeBasePath: 'tutorials', // Changed to 'tutorials' (plural) to match navbar
        sidebarPath: require.resolve('./tutorialsSidebars.js'), // Point to tutorials-specific sidebar file
        // Remove any editUrl or other optional fields
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs',
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./docsSidebars.js'), // Point to docs-specific sidebar file
        // Remove any editUrl or other optional fields
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'EA Forms Docs',
        logo: {
          alt: 'EA Forms Logo',
          src: 'img/logo.svg',
        },
        items: [
          // Updated to match routeBasePath
          {
            to: '/tutorials',
            label: 'Tutorials',
            position: 'left',
          },
          {
            to: '/docs',
            label: 'Docs',
            position: 'left',
          },
          {
            href: 'https://eaforms.com/',
            label: 'Get EA Forms',
            position: 'right',
          },
        ],
      },
      // Other theme config...
    }),
};

export default config;