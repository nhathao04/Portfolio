import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './GuestBook.module.css';

const API_URL = 'http://localhost:3000';
const COMMENTS_PER_PAGE = 10;

const GuestBook = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Anonymous',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      setError('Failed to load comments. Please try again later.');
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError('Name and message are required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      const newComment = await response.json();
      setComments(prev => [newComment, ...prev]);
      setFormData({ name: 'Anonymous', email: '', message: '' });
      setCurrentPage(1); // Reset to first page after new comment
      
      // Scroll to the new comment
      setTimeout(() => {
        document.getElementById('comments-list').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      setError('Failed to submit comment. Please try again.');
      console.error('Error submitting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(comments.length / COMMENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * COMMENTS_PER_PAGE;
  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const currentComments = comments.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.getElementById('comments-list').scrollIntoView({ behavior: 'smooth' });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className={styles.pageNumbers}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
            <button
              key={pageNumber}
              className={`${styles.pageNumber} ${pageNumber === currentPage ? styles.active : ''}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
        </div>

        <button
          className={styles.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  return (
    <motion.div 
      className={styles.guestBook}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className={styles.header}>
        <h1 className={styles.title}>Guest Book</h1>
        <p className={styles.subtitle}>Leave a message for future visitors!</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Your Email (optional)"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="message"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader className={styles.spinner} size={20} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={20} />
              Submit
            </>
          )}
        </button>
      </form>

      <section className={styles.commentsSection}>
        <h2 className={styles.commentsTitle}>
          Messages
          {comments.length > 0 && (
            <span className={styles.commentCount}>
              ({comments.length} {comments.length === 1 ? 'message' : 'messages'})
            </span>
          )}
        </h2>
        {isLoading ? (
          <div className={styles.loading}>
            <Loader className={styles.spinner} size={30} />
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className={styles.noComments}>
            No messages yet. Be the first to write one!
          </div>
        ) : (
          <>
            <div id="comments-list" className={styles.commentsList}>
              <AnimatePresence mode="wait">
                {currentComments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className={styles.commentCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.name}</span>
                      <span className={styles.commentDate}>
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className={styles.commentMessage}>{comment.message}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {renderPagination()}
          </>
        )}
      </section>
    </motion.div>
  );
};

export default GuestBook; 