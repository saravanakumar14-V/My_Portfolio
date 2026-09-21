'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Heading } from '@/components/ui/Heading';
import { ProjectGalleryItem } from '@/types/project';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import Image from 'next/image';
import styles from './ProjectGallery.module.css';

interface ProjectGalleryProps {
  gallery?: ProjectGalleryItem[];
}

export function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const [activeImage, setActiveImage] = useState<ProjectGalleryItem | null>(null);

  if (!gallery || gallery.length === 0) return null;

  return (
    <Section spacing="lg" className={styles.gallerySection}>
      <Container size="wide">
        <Heading level={2} size="base" className={styles.label}>
          Gallery
        </Heading>
        
        <div className={styles.grid}>
          {gallery.map((item, idx) => (
            <CursorTrigger key={idx} cursorState="hover" label="View">
              <div 
                className={styles.thumbnailWrapper}
                onClick={() => setActiveImage(item)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  className={styles.thumbnail}
                />
              </div>
            </CursorTrigger>
          ))}
        </div>
      </Container>

      {/* Fullscreen Lightbox Modal */}
      {activeImage && (
        <div className={styles.lightbox} onClick={() => setActiveImage(null)}>
          <CursorTrigger cursorState="hover" label="Close">
            <div className={styles.lightboxClose}>×</div>
          </CursorTrigger>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={activeImage.width}
              height={activeImage.height}
              className={styles.lightboxImage}
              priority
            />
            {activeImage.caption && (
              <div className={styles.caption}>{activeImage.caption}</div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
