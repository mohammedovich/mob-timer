// export default { content: [ "./index.html", "./**/*/.{js,ts,jsx,tsx}", ]}

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: { extend: {} },
  plugins: [],
};
