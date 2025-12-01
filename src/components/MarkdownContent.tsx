import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        // 헤딩
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mt-6 mb-4 text-slate-800">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-semibold mt-5 mb-3 text-slate-800">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold mt-4 mb-2 text-slate-800">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-semibold mt-3 mb-2 text-slate-700">
            {children}
          </h4>
        ),

        // 문단
        p: ({ children }) => (
          <p className="mb-3 text-slate-700 leading-relaxed">{children}</p>
        ),

        // 리스트
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-3 space-y-1 text-slate-700">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-3 space-y-1 text-slate-700">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="ml-2">{children}</li>,

        // 강조
        strong: ({ children }) => (
          <strong className="font-semibold text-slate-800">{children}</strong>
        ),
        em: ({ children }) => <em className="italic text-slate-700">{children}</em>,

        // 코드
        code: ({ className, children }) => {
          // 인라인 코드
          if (!className) {
            return (
              <code className="px-1.5 py-0.5 bg-slate-100 text-[#001f5c] rounded text-sm font-mono">
                {children}
              </code>
            );
          }
          // 코드 블록
          return (
            <code className="block bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-3">
              {children}
            </code>
          );
        },
        pre: ({ children }) => <pre className="my-3">{children}</pre>,

        // 인용구
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#001f5c] pl-4 py-2 my-3 text-slate-600 italic bg-slate-50 rounded-r">
            {children}
          </blockquote>
        ),

        // 링크
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#003087] hover:text-[#001f5c] underline transition-colors"
          >
            {children}
          </a>
        ),

        // 수평선
        hr: () => <hr className="my-4 border-slate-200" />,

        // 테이블
        table: ({ children }) => (
          <div className="overflow-x-auto my-3">
            <table className="min-w-full border-collapse border border-slate-300">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-slate-100">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b border-slate-200">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2 text-left font-semibold text-slate-800 border border-slate-300">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2 text-slate-700 border border-slate-300">
            {children}
          </td>
        ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

