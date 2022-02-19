import type { VFC } from 'react';

type Props =
  | {
      text: {
        plain_text: string;
        href: string | null;
        type: 'equation' | 'text' | 'mention';
        annotations: {
          bold: boolean;
          italic: boolean;
          strikethrough: boolean;
          underline: boolean;
          code: boolean;
          color:
            | 'default'
            | 'gray'
            | 'brown'
            | 'orange'
            | 'yellow'
            | 'green'
            | 'blue'
            | 'purple'
            | 'pink'
            | 'red'
            | 'gray_background'
            | 'brown_background'
            | 'orange_background'
            | 'yellow_background'
            | 'green_background'
            | 'blue_background'
            | 'purple_background'
            | 'pink_background'
            | 'red_background';
        };
      }[];
    }
  | undefined;

export const NotionText: VFC<Props> = ({ text }) => {
  return (
    <>
      {text.map(({ plain_text, href, annotations }) => {
        if (href !== null) {
          return (
            <a
              className='text-blue-600 underline hover:text-blue-500'
              key={href + plain_text}
              href={href}
              target='_blank'
              rel='noreferrer'
            >
              {plain_text}
            </a>
          );
        }
        if (annotations.code) {
          return <span className='rounded-md bg-gray-200 p-0.5 font-mono text-xs text-red-500'>{plain_text}</span>;
        }

        return plain_text;
      })}
    </>
  );
};
