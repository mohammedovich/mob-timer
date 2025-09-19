'use client';

export default function Footer() {
  return (
    <footer className="mt-12 mb-8 text-center">
      {/* Support Card */}
      <div
        className="
          inline-block p-6 max-w-xs
          bg-gray-100 dark:bg-gray-800
          rounded-xl shadow-md
          hover:shadow-lg
          transition-shadow duration-300
          animate-fade-in
        "
      >
        <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          <span className="font-semibold">Love the Mob Programming Timer?</span>
          <br />
          Help keep it free and improve future features.
        </p>

        {/* Buy Me a Coffee Button with Animation */}
        <a
          href="https://buymeacoffee.com/mohammedovich"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group inline-flex items-center space-x-2
            px-5 py-2.5
            bg-gradient-to-r from-yellow-400 to-orange-500
            text-white text-sm font-bold
            rounded-full
            hover:from-yellow-500 hover:to-orange-600
            transform transition-all duration-200
            hover:scale-105 hover:shadow-md
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
          "
        >
          <span
            className="
              transform 
              group-hover:rotate-12 
              transition-transform duration-200
            "
          >
            ☕
          </span>
          <span>Buy Me a Coffee</span>
        </a>
      </div>

      {/* GitHub & Credit Section */}
      <div className="mt-6 space-y-3">
        <p className="text-sm text-gray-500 dark:text-gray-400 transition-opacity hover:opacity-80">
          Made with ❤️ for better team collaboration
        </p>

        <a
          href="https://github.com/yourusername/mob-programming-timer" // 🔁 Replace with your repo
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center space-x-1.5
            text-blue-600 dark:text-blue-400 text-sm font-medium
            hover:underline
            hover:text-blue-800 dark:hover:text-blue-300
            transition
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span>View Source on GitHub</span>
        </a>
      </div>
    </footer>
  );
}