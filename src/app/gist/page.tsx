import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gists",
  description: "Code snippets and gists collection",
};

export default function GistPage() {
  return (
    <div>
      <h1>Gists</h1>
      <p>Welcome to the gists section. Here you can find various code snippets and technical guides.</p>
      <div>
        <h2>Available Gists:</h2>
        <ul>
          <li><Link href="/gist/docker-commands">Docker Commands</Link></li>
          <li><Link href="/gist/git-hooks-guide">Git Hooks Guide</Link></li>
          <li><Link href="/gist/powershell-scripting">PowerShell Scripting</Link></li>
          <li><Link href="/gist/product-requirement-doc-guide">Product Requirement Doc Guide</Link></li>
          <li><Link href="/gist/react-component-lifecycle">React Component Lifecycle</Link></li>
          <li><Link href="/gist/running-scripts-in-linux">Running Scripts in Linux</Link></li>
          <li><Link href="/gist/scripts-gist">Scripts Gist</Link></li>
          <li><Link href="/gist/typescript-glob-patterns">TypeScript Glob Patterns</Link></li>
          <li><Link href="/gist/typescript-types">TypeScript Types</Link></li>
          <li><Link href="/gist/using-json-schema-in-vscode">Using JSON Schema in VSCode</Link></li>
          <li><Link href="/gist/using-tasks-in-vscode">Using Tasks in VSCode</Link></li>
        </ul>
      </div>
    </div>
  );
}