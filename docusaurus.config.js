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
        routeBasePath: 'tutorial', // Change to 'tutorial' (singular)
        sidebarPath: require.resolve('./sidebars.js'),
        // Remove any editUrl or other optional fields
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'docs',
        path: 'docs',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
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
          // Simplify the navbar items
          {
            to: '/tutorial',
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