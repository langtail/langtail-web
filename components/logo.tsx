"use client"

interface LogoProps {
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo = (props: LogoProps) => {
  const theme = props.theme || 'light';
  const style = {
    dark: {
      primary: '#6366F1',
      secondary: '#4338CA',
      text: '#475569',
    },
    light: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      text: '#FFFFFF',
    },
  };

  const currentTheme = style[theme];

  return (
    <svg
      className={props.className}
      viewBox="0 0 304 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={currentTheme.primary}
        d="M24.324 49.125c-4.633 0-8.449-3.816-8.449-8.449V7.495L0 23.37v17.306C0 54.098 10.902 65 24.324 65h17.238l15.943-15.875H24.324Z"
      />
      <path
        fill={currentTheme.secondary}
        d="M57.505 31.887v17.238h-9.948c-3.27 0-5.995-2.726-5.995-5.996V31.887c0-4.701-3.748-8.517-8.449-8.517H21.871c-3.339 0-5.996-2.657-5.996-5.928V7.495h17.238c13.422 0 24.392 10.901 24.392 24.392Z"
      />
      <path
        fill={currentTheme.secondary}
        d="M68.338 0v15.33a6.397 6.397 0 0 1-6.404 6.405h-3.748C55.938 16.08 51.85 11.447 46.603 8.38V6.405A6.397 6.397 0 0 1 53.008 0h15.33Z"
      />
      <path
        fill={currentTheme.text}
        d="M81.15 15h6.6v28.9h18V50h-24.6V15Zm47.99 13.75.2-3.4h5.85V50h-5.75l-.3-3.6c-1.4 2.9-5.25 4.3-8 4.35-7.3.05-12.7-4.45-12.7-13.1 0-8.5 5.65-12.95 12.85-12.9 3.3 0 6.45 1.55 7.85 4Zm-7.3 1.45c-4.05 0-7.3 2.75-7.3 7.45s3.25 7.5 7.3 7.5c9.6 0 9.6-14.95 0-14.95ZM166.175 50h-6.1V37.1c0-3.75-2.05-6.6-5.95-6.6-3.75 0-6.3 3.15-6.3 6.9V50h-6.05V25.3h5.45l.4 3.35c2.5-2.45 5-3.7 8.1-3.7 5.8 0 10.45 4.35 10.45 12.1V50Zm24.664-23.9 2.75-3.4 4.5 3.4-3.1 3.6c2.15 2.55 2.85 4.8 2.85 7.35 0 4.4-2.05 7.4-6.1 9.25 5.25 1.9 6.1 5.6 6.1 8 0 7-6.85 10.4-13.45 10.4-8.55 0-13.55-4.3-13.3-11.35h6.05c-.2 3.45 3.4 5.4 7.25 5.45 3.4 0 7.1-1.45 7.1-4.5 0-2.95-2.4-4.85-7-4.85-8.15 0-13.5-4.7-13.5-12.4 0-8.3 6.6-12.5 13.5-12.5 1.95 0 4.65.4 6.35 1.55Zm-6.35 4.1c-4 0-7.4 2.25-7.4 6.85 0 4.3 3.4 6.8 7.4 6.8s7.25-2.55 7.25-6.8c0-4.2-3.25-6.85-7.25-6.85Zm21.559-11.15 6.1-.65v7h6.8v5.25h-6.85V41.3c0 2.35 1.3 3.5 3.2 3.5.95 0 2.05-.3 2.95-.75l1.7 5.2c-1.75.7-3.2 1-5.05 1.05-5.35.2-8.85-2.85-8.85-9V30.65h-4.6V25.4h4.6v-6.35Zm37.252 9.7.2-3.4h5.85V50h-5.75l-.3-3.6c-1.4 2.9-5.25 4.3-8 4.35-7.3.05-12.7-4.45-12.7-13.1 0-8.5 5.65-12.95 12.85-12.9 3.3 0 6.45 1.55 7.85 4ZM236 30.2c-4.05 0-7.3 2.75-7.3 7.45s3.25 7.5 7.3 7.5c9.6 0 9.6-14.95 0-14.95Zm26.035-4.95V50h-6.1V25.25h6.1Zm-6.65-6.85c0 4.75 7.2 4.75 7.2 0s-7.2-4.75-7.2 0Zm13.395-3.35h6.05V50h-6.05V15.05Z"
      />
    </svg>
  );
};