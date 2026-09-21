'use client';

import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { Stack } from '@/components/layout/Stack';
import { Spacer } from '@/components/layout/Spacer';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { CursorTrigger } from '@/effects/cursor/CursorTriggers';
import { GlassSurface } from '@/effects/overlays/GlassSurface';
import { Project } from '@/types/project';
import styles from './ProjectArchitecture.module.css';

interface ProjectArchitectureProps {
  project: Project;
}

export function ProjectArchitecture({ project }: ProjectArchitectureProps) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  if (!project.architecture || project.architecture.length === 0) return null;

  return (
    <Section spacing="lg" className={styles.archSection}>
      <Container size="wide">
        <Stack gap="xl">
          <div className={styles.header}>
            <Heading level={2} size="base" className={styles.label}>
              System Architecture
            </Heading>
            <Heading level={3} size="4xl" className={styles.title}>
              Engineering the foundation.
            </Heading>
          </div>
          
          <Spacer size="lg" />

          <div className={styles.diagram}>
            {project.architecture.map(node => {
              // Determine if this node is active, or connected to the active node
              const isConnected = activeNode && (
                activeNode === node.id || 
                node.connections.includes(activeNode) ||
                project.architecture!.find(n => n.id === activeNode)?.connections.includes(node.id)
              );
              
              const isDimmed = activeNode !== null && !isConnected;

              return (
                <CursorTrigger key={node.id} cursorState="hover" magnetic>
                  <div 
                    className={`${styles.node} ${isDimmed ? styles.dimmed : ''}`}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                  >
                    <GlassSurface variant="heavy" className={styles.nodeCard}>
                      <Text size="xs" className={styles.nodeType}>[{node.type}]</Text>
                      <Heading level={4} size="xl" className={styles.nodeLabel}>
                        {node.label}
                      </Heading>
                      
                      {/* Revealed on hover/focus via CSS */}
                      <div className={styles.nodeDetails}>
                        <Text size="sm" color="secondary">
                          {node.description}
                        </Text>
                      </div>
                    </GlassSurface>
                  </div>
                </CursorTrigger>
              );
            })}
          </div>
        </Stack>
      </Container>
    </Section>
  );
}
