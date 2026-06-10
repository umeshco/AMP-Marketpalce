import React, { useState } from 'react';
import { BlogPost } from './initialBlogs';

// Styling constants matching the parent application theme
const p = {
  primary: "#0F172A",
  accent: "#6366F1",
  accentLight: "#EEF2FF",
  accentDark: "#4338CA",
  success: "#10B981",
  successLight: "#ECFDF5",
  warningLight: "#FFFBEB",
  danger: "#EF4444",
  dangerLight: "#FEF2F2",
  muted: "#64748B",
  border: "#E2E8F0",
  bg: "#F8FAFC",
  text: "#0F172A",
  textSoft: "#475569"
};

interface BlogsManagerAdminProps {
  blogs: BlogPost[];
  setBlogs: (blogs: BlogPost[] | ((prev: BlogPost[]) => BlogPost[])) => void;
  showToast: (msg: string, type?: "success" | "error") => void;
}

export function BlogsManagerAdmin({ blogs, setBlogs, showToast }: BlogsManagerAdminProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // Form states
  const [emoji, setEmoji] = useState("📝");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("SEO Strategy");
  const [author, setAuthor] = useState("Authority Media Team");
  const [readTime, setReadTime] = useState("8 min");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const categories = [
    "Link Building",
    "SEO Strategy",
    "Publisher Tips",
    "Content Strategy",
    "Platform Guide",
    "Advanced SEO",
    "GEO Strategy",
    "Google E-E-A-T",
    "AEO Strategy"
  ];

  const emojis = ["📂", "📝", "🔗", "📊", "💰", "🎯", "🛡️", "⚡", "🧠", "💬", "📈", "🚀", "💡", "📢"];

  const handleOpenCreate = () => {
    setEditingBlog(null);
    setEmoji("📝");
    setTitle("");
    setCategory("SEO Strategy");
    setAuthor("Authority Media Team");
    setReadTime("8 min");
    const today = new Date();
    setExcerpt("");
    setContent("");
    setIsFormOpen(true);
  };

  const handleOpenEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setEmoji(blog.emoji);
    setTitle(blog.title);
    setCategory(blog.category);
    setAuthor(blog.author);
    setReadTime(blog.readTime);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !excerpt.trim() || !content.trim()) {
      showToast("Please fill all required fields.", "error");
      return;
    }

    // Input sanitization utility
    const sanitizeInput = (val: string): string => {
      return val
        .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "[filtered_script]")
        .replace(/<iframe[^>]*>([\s\S]*?)<\/iframe>/gi, "[filtered_iframe]")
        .replace(/(javascript\s*:\s*|onclick\s*=|onload\s*=|onerror\s*=)/gi, "[filtered_handler]")
        .replace(/[<]/g, "&lt;")
        .replace(/[>]/g, "&gt;");
    };

    const cleanTitle = sanitizeInput(title);
    const cleanExcerpt = sanitizeInput(excerpt);
    const cleanContent = sanitizeInput(content);
    const cleanAuthor = sanitizeInput(author);
    const cleanReadTime = sanitizeInput(readTime);

    const todayStr = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    if (editingBlog) {
      // Editing
      const updatedBlogs = blogs.map(b => 
        b.id === editingBlog.id 
          ? { ...b, emoji, title: cleanTitle, category, author: cleanAuthor, readTime: cleanReadTime, excerpt: cleanExcerpt, content: cleanContent }
          : b
      );
      setBlogs(updatedBlogs);
      showToast(`✓ Blog "${cleanTitle}" updated successfully!`, "success");
    } else {
      // Creating
      const newId = blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1;
      const newBlog: BlogPost = {
        id: newId,
        emoji,
        title: cleanTitle,
        category,
        author: cleanAuthor,
        readTime: cleanReadTime,
        date: todayStr,
        excerpt: cleanExcerpt,
        content: cleanContent
      };
      setBlogs([newBlog, ...blogs]);
      showToast(`✓ Blog "${cleanTitle}" posted successfully!`, "success");
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: number) => {
    const blogToDelete = blogs.find(b => b.id === id);
    if (!blogToDelete) return;
    
    if (window.confirm(`Are you sure you want to delete the blog post "${blogToDelete.title}"?`)) {
      setBlogs(blogs.filter(b => b.id !== id));
      showToast(`✓ Blog "${blogToDelete.title}" deleted.`, "success");
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm("Restore original blogs and clear customize edits? This removes newly posted blogs.")) {
      try {
        localStorage.removeItem("amp_blogs");
        // Force reload page to initialize state from core files
        window.location.reload();
      } catch {}
    }
  };

  const filteredBlogs = blogs
    .filter(b => categoryFilter === "all" || b.category === categoryFilter)
    .filter(b => 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="page" id="admin-blog-manager">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div className="page-title">📝 Blog Post Management</div>
          <div className="page-subtitle">Post new articles, edit SEO information, or delete existing blogs about SEO GEO EEAT AEO</div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button 
            type="button"
            className="btn" 
            style={{ padding: '10px 16px', background: '#F1F5F9', border: '1px solid #CBD5E1', color: p.textSoft, fontWeight: 600, fontSize: 13, borderRadius: 8, cursor: 'pointer' }}
            onClick={handleResetToDefaults}
          >
            🔄 Reset to Default Articles
          </button>
          <button 
            type="button"
            className="btn btn-primary" 
            style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #6366F1, #4338CA)', color: 'white', border: 'none', fontWeight: 700, fontSize: 13, borderRadius: 8, cursor: 'pointer' }}
            onClick={handleOpenCreate}
          >
            ✍️ Post New Blog
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 200px', gap: 12, marginBottom: 18 }}>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: p.muted, display: 'block', marginBottom: 4 }}>Filter Category</label>
          <select 
            className="input" 
            style={{ height: 42, cursor: 'pointer', outline: 'none' }}
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Niches</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: p.muted, display: 'block', marginBottom: 4 }}>Search Posts</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: p.muted }}>🔍</span>
            <input 
              type="text" 
              className="input" 
              style={{ paddingLeft: 38, height: 42 }}
              placeholder="Search title, description, or writer name..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
            />
          </div>
        </div>
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: p.muted, display: 'block', marginBottom: 4 }}>Count</label>
          <div style={{ height: 42, background: 'white', border: `1px solid ${p.border}`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: p.primary, fontSize: 14 }}>
            📝 {filteredBlogs.length} Articles
          </div>
        </div>
      </div>

      {isFormOpen && (
        <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 4px 12px rgba(99,102,241,0.05)' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: p.primary, marginBottom: 18, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {editingBlog ? "✏️ Edit Blog Post Details" : "✨ Publish a New SEO / EEAT Article"}
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(80px, auto) 2fr 1.5fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>Emoji</label>
                <select 
                  className="input" 
                  style={{ height: 42, outline: 'none' }}
                  value={emoji} 
                  onChange={e => setEmoji(e.target.value)}
                >
                  {emojis.map(em => (
                    <option key={em} value={em}>{em}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>Post Title *</label>
                <input 
                  type="text" 
                  className="input" 
                  style={{ height: 42 }}
                  placeholder="e.g. Google E-E-A-T Playbook: Unlocking Publisher Experience" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>Niche Category</label>
                <select 
                  className="input" 
                  style={{ height: 42, outline: 'none' }}
                  value={category} 
                  onChange={e => setCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>Author Name</label>
                <input 
                  type="text" 
                  className="input" 
                  style={{ height: 42 }}
                  placeholder="Authority Media Team" 
                  value={author} 
                  onChange={e => setAuthor(e.target.value)} 
                />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>Estimated Reading Time</label>
                <input 
                  type="text" 
                  className="input" 
                  style={{ height: 42 }}
                  placeholder="8 min" 
                  value={readTime} 
                  onChange={e => setReadTime(e.target.value)} 
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>Brief Extract / Excerpt * (Displayed on the blog main listing)</label>
              <textarea 
                className="input" 
                style={{ height: 60, padding: '10px 14px', resize: 'vertical' }}
                placeholder="Providing an summary of what readers will learn in this post." 
                value={excerpt} 
                onChange={e => setExcerpt(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: p.textSoft, display: 'block', marginBottom: 4 }}>
                Article Content * (Use double newlines to split paragraphs. Type headlines in UPPERCASE, e.g., 'WHY E-E-A-T MATTERS' on a separate line)
              </label>
              <textarea 
                className="input" 
                style={{ height: 260, padding: '12px 14px', resize: 'vertical', fontFamily: 'monospace', fontSize: 13 }}
                placeholder={`Provide the full article text. For example:\n\nHOW TO RANK IN AI SEARCH SUMMARY\n\nOptimizing for Generative Engine Search requires clear answer structures.\n\nE-E-A-T VALUE MATTERS\n\nGoogle continues to prioritize human experience...`} 
                value={content} 
                onChange={e => setContent(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
              <button 
                type="button" 
                className="btn" 
                style={{ padding: '10px 18px', background: 'white', border: `1px solid ${p.border}`, color: p.textSoft, fontWeight: 600, fontSize: 14, borderRadius: 8, cursor: 'pointer' }}
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ padding: '10px 22px', background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', color: 'white', fontWeight: 700, fontSize: 14, borderRadius: 8, cursor: 'pointer' }}
              >
                {editingBlog ? "Save Edits" : "🚀 Post Blog Article"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${p.border}` }}>
                <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: p.muted, textTransform: 'uppercase' }}>Article Title</th>
                <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: p.muted, textTransform: 'uppercase' }}>Niche</th>
                <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: p.muted, textTransform: 'uppercase' }}>Writer</th>
                <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: p.muted, textTransform: 'uppercase' }}>Publish Date</th>
                <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: p.muted, textTransform: 'uppercase' }}>Reading Time</th>
                <th style={{ padding: '14px 18px', fontSize: 12, fontWeight: 700, color: p.muted, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '36px', textAlign: 'center' }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>📝</div>
                    <div style={{ fontWeight: 700, color: p.primary, fontSize: 15, marginBottom: 4 }}>No blog articles found</div>
                    <div style={{ fontSize: 13, color: p.muted }}>Try clearing filters or adding a new article above</div>
                  </td>
                </tr>
              ) : (
                filteredBlogs.map((b) => (
                  <tr key={b.id} style={{ borderBottom: `1px solid ${p.border}`, transition: 'background-color 0.15s' }}>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 24 }}>{b.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 700, color: p.primary, fontSize: 14 }}>{b.title}</div>
                          <div style={{ fontSize: 12, color: p.muted, maxWidth: 440, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: 2 }}>{b.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <span className="badge badge-info" style={{ fontSize: 11 }}>{b.category}</span>
                    </td>
                    <td style={{ padding: '14px 18px', fontSize: 13, fontWeight: 500, color: p.textSoft }}>{b.author}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: p.muted }}>{b.date}</td>
                    <td style={{ padding: '14px 18px', fontSize: 13, color: p.muted }}>⏱ {b.readTime}</td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        <button 
                          type="button"
                          className="btn" 
                          style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#1D4ED8', borderRadius: 6, cursor: 'pointer' }}
                          onClick={() => handleOpenEdit(b)}
                        >
                          ✏️ Edit
                        </button>
                        <button 
                          type="button"
                          className="btn" 
                          style={{ padding: '6px 12px', fontSize: 12, fontWeight: 600, background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 6, cursor: 'pointer' }}
                          onClick={() => handleDelete(b.id)}
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
