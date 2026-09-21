'use client';

import { useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className={styles.successState}>
        <Icon icon={CheckCircle2} size="lg" className={styles.successIcon} />
        <h4 className={styles.successTitle}>Message Received</h4>
        <p className={styles.successText}>I&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input 
          type="text" 
          id="name" 
          name="name" 
          className={styles.input} 
          placeholder=" " 
          required 
        />
        <label htmlFor="name" className={styles.label}>Name</label>
      </div>
      
      <div className={styles.inputGroup}>
        <input 
          type="email" 
          id="email" 
          name="email" 
          className={styles.input} 
          placeholder=" " 
          required 
        />
        <label htmlFor="email" className={styles.label}>Email</label>
      </div>
      
      <div className={styles.inputGroup}>
        <textarea 
          id="message" 
          name="message" 
          className={styles.textarea} 
          placeholder=" " 
          rows={4}
          required 
        />
        <label htmlFor="message" className={styles.label}>Message</label>
      </div>
      
      <div className={styles.submitWrapper}>
        <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
          {!isSubmitting && <Icon icon={Send} size="sm" />}
        </button>
      </div>
    </form>
  );
}
