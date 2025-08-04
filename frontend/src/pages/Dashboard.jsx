import React, { useState, useEffect } from 'react';
import { journalAPI } from '../services/api';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [journals, setJournals] = useState([]);
  const [newJournal, setNewJournal] = useState({ title: '', content: '' });
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('');

  const quotes = [
    "Every day is a new beginning. Take a deep breath and start again.",
    "Your thoughts create your reality. Choose them wisely.",
    "The only way to do great work is to love what you do.",
    "Believe you can and you're halfway there.",
    "Today is your day to shine!"
  ];

  const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😰', label: 'Anxious' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '🤔', label: 'Thoughtful' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '🎉', label: 'Excited' }
  ];

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await journalAPI.getAllJournals();
      setJournals(response.data.journals);
    } catch (error) {
      console.error('Failed to fetch journals:', error);
    }
  };

  const handleCreateJournal = async (e) => {
    e.preventDefault();
    if (!newJournal.title || !newJournal.content) {
      setMessage('Please fill in both title and content');
      return;
    }

    if (!mood) {
      setMessage('Please select your mood before submitting!');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await journalAPI.createJournal({ ...newJournal, mood });
      setNewJournal({ title: '', content: '' });
      setMood('');
      setMessage('Journal entry created successfully!');
      fetchJournals();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to create journal entry');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePin = async (journalId) => {
    try {
      await journalAPI.togglePinJournal(journalId);
      fetchJournals();
    } catch (error) {
      console.error('Failed to toggle pin:', error);
    }
  };

  const handleDeleteJournal = async (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await journalAPI.deleteJournal(journalId);
        fetchJournals();
        setMessage('Journal entry deleted successfully!');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Failed to delete journal entry');
      }
    }
  };

  const handleDownloadPDF = (journal) => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Set font to Helvetica
    doc.setFont('helvetica');
    
    // Page dimensions
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    
    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(journal.title, margin, 30);
    
    // Mood and date line
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const moodText = journal.mood ? `${getMoodEmoji(journal.mood)} ${journal.mood}` : 'No mood selected';
    const dateText = new Date(journal.created_at).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    doc.text(moodText, margin, 45);
    doc.text(dateText, margin, 55);
    
    // Content
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    
    // Split content into lines that fit the page width
    const contentLines = doc.splitTextToSize(journal.content, contentWidth);
    let yPosition = 75;
    
    // Add content lines
    contentLines.forEach((line, index) => {
      // Check if we need a new page
      if (yPosition > doc.internal.pageSize.height - 40) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, margin, yPosition);
      yPosition += 7;
    });
    
    // Footer
    const footerText = 'MindCare Journal';
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128); // Gray color
    doc.text(footerText, pageWidth / 2, doc.internal.pageSize.height - 10, { align: 'center' });
    
    // Save the PDF
    doc.save(`journal-${journal.id}.pdf`);
  };

  const getMoodEmoji = (label) => {
    const moodObj = moods.find(m => m.label === label);
    return moodObj ? moodObj.emoji : '';
  };

  // Filter journals based on search term and mood
  const filteredJournals = journals.filter(journal => {
    const matchesSearch = searchTerm === '' || 
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      journal.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMood = filterMood === '' || journal.mood === filterMood;
    
    return matchesSearch && matchesMood;
  });

  // Handle quote shuffle with fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 500); // Fade out for 500ms
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container fade-in" style={{ paddingTop: '2rem' }}>
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '8px',
          backgroundColor: message.includes('successfully') ? 'var(--light-brown)' : 'var(--deep-red)',
          color: 'white',
          textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      {/* Quote card */}
      <div className="card mb-20">
        <h3 style={{ color: 'var(--coral-accent)', marginBottom: '10px' }}>💭 Today's Inspiration</h3>
        <p style={{
          fontStyle: 'italic',
          color: 'var(--text-secondary)',
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}>
          "{quotes[quoteIndex]}"
        </p>
      </div>

      {/* Grid section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left column */}
        <div>
          <div className="card">
            <h3 style={{ color: 'var(--coral-accent)', marginBottom: '20px' }}>📝 New Journal Entry</h3>
            <div className="form-group">
              <label>How are you feeling today?</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {moods.map((moodOption) => (
                  <button
                    key={moodOption.label}
                    onClick={() => setMood(moodOption.label)}
                    style={{
                      padding: '8px 12px',
                      border: mood === moodOption.label ? '2px solid var(--coral-accent)' : '2px solid var(--border-color)',
                      borderRadius: '20px',
                      background: mood === moodOption.label ? 'var(--coral-accent)' : 'transparent',
                      color: mood === moodOption.label ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '16px'
                    }}
                  >
                    {moodOption.emoji} {moodOption.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleCreateJournal}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={newJournal.title}
                  onChange={(e) => setNewJournal({ ...newJournal, title: e.target.value })}
                  placeholder="What's on your mind?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  value={newJournal.content}
                  onChange={(e) => setNewJournal({ ...newJournal, content: e.target.value })}
                  placeholder="Write your thoughts here..."
                  rows="6"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Entry'}
              </button>
            </form>
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="card">
            <h3 style={{ color: 'var(--coral-accent)', marginBottom: '20px' }}>📚 Your Journals</h3>
            
            {/* Search and Filter Section */}
            <div style={{ marginBottom: '20px' }}>
              {/* Search Input */}
              <div className="form-group" style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Search by title or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ fontSize: '14px' }}
                />
              </div>
              
              {/* Mood Filter Buttons */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500', 
                  color: 'var(--text-primary)',
                  fontSize: '14px'
                }}>
                  Filter by mood:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() => setFilterMood('')}
                    style={{
                      padding: '6px 12px',
                      border: filterMood === '' ? '2px solid var(--coral-accent)' : '2px solid var(--border-color)',
                      borderRadius: '16px',
                      background: filterMood === '' ? 'var(--coral-accent)' : 'transparent',
                      color: filterMood === '' ? 'white' : 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🌈 All Moods
                  </button>
                  {moods.map((moodOption) => (
                    <button
                      key={moodOption.label}
                      onClick={() => setFilterMood(moodOption.label)}
                      style={{
                        padding: '6px 12px',
                        border: filterMood === moodOption.label ? '2px solid var(--coral-accent)' : '2px solid var(--border-color)',
                        borderRadius: '16px',
                        background: filterMood === moodOption.label ? 'var(--coral-accent)' : 'transparent',
                        color: filterMood === moodOption.label ? 'white' : 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '500',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {moodOption.emoji} {moodOption.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Results Count */}
              {journals.length > 0 && (
                <p style={{ 
                  fontSize: '12px', 
                  color: 'var(--text-secondary)', 
                  marginBottom: '10px',
                  fontStyle: 'italic'
                }}>
                  Showing {filteredJournals.length} of {journals.length} entries
                </p>
              )}
            </div>
            
            {journals.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                No journal entries yet. Start writing your first entry!
              </p>
            ) : filteredJournals.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                No entries match your search criteria.
              </p>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {filteredJournals.map((journal) => (
                  <div
                    key={journal.id}
                    className="card"
                    style={{
                      marginBottom: '15px',
                      border: journal.pinned ? '2px solid var(--coral-accent)' : '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '8px'
                        }}>
                          {journal.pinned && <span>📌</span>}
                          {journal.mood ? `${getMoodEmoji(journal.mood)} ` : ''}{journal.title}
                        </h4>
                        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                          {new Date(journal.created_at).toLocaleDateString()}
                        </p>
                        <p>{journal.content.length > 150
                          ? `${journal.content.substring(0, 150)}...`
                          : journal.content}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: '8px', marginLeft: '10px' }}>
                        <button
                          onClick={() => handleTogglePin(journal.id)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                          title={journal.pinned ? 'Unpin' : 'Pin'}
                        >
                          {journal.pinned ? '📌' : '📍'}
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(journal)}
                          className="btn btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '12px', backgroundColor: 'var(--warm-gray)' }}
                          title="Download PDF"
                        >
                          📄
                        </button>
                        <button
                          onClick={() => handleDeleteJournal(journal.id)}
                          className="btn btn-primary"
                          style={{ padding: '6px 10px', fontSize: '12px', backgroundColor: 'var(--deep-red)' }}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
