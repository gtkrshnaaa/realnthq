'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard_layout';
import { BroadcastStage } from '@/components/broadcasts/broadcast_stage';
import { BroadcastQa, QaQuestion } from '@/components/broadcasts/broadcast_qa';
import { UserProfile, UserPresenceStatus } from '@/types/office.types';

export default function BroadcastsPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'b0000000-0000-0000-0000-000000000001',
    email: 'admin@squad.realnthq.local',
    fullName: 'Alex Vance',
    displayTitle: 'Head of Engineering',
    status: 'AVAILABLE',
    statusMessage: 'Attending Q3 All-Hands Townhall',
  });

  const [isHandRaised, setIsHandRaised] = useState(false);
  const [viewerCount, setViewerCount] = useState(48);

  const [questions, setQuestions] = useState<QaQuestion[]>([
    {
      id: 'q-1',
      authorName: 'Sarah Connor',
      authorTitle: 'Staff Designer',
      content: 'When will the new Warm Editorial design tokens be finalized across mobile clients?',
      upvotes: 12,
      timestamp: '10:04 AM',
    },
    {
      id: 'q-2',
      authorName: 'Kenji Sato',
      authorTitle: 'Distributed Systems Lead',
      content: 'How will the self-hosted SFU mesh handle latency spikes across multi-region edge nodes?',
      upvotes: 8,
      timestamp: '10:12 AM',
    },
  ]);

  const handleUpdateStatus = (status: UserPresenceStatus, message?: string) => {
    setCurrentUser((prev) => ({ ...prev, status, statusMessage: message }));
  };

  const handleToggleHandRaise = () => {
    setIsHandRaised((prev) => !prev);
  };

  const handleSubmitQuestion = (text: string) => {
    const newQ: QaQuestion = {
      id: `q-${Date.now()}`,
      authorName: currentUser.fullName,
      authorTitle: currentUser.displayTitle,
      content: text,
      upvotes: 1,
      timestamp: 'Just now',
    };
    setQuestions((prev) => [newQ, ...prev]);
  };

  const handleUpvoteQuestion = (id: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q)),
    );
  };

  return (
    <DashboardLayout
      activePath="/broadcasts"
      title="Company Townhall & Broadcasts"
      subtitle="Executive keynote stage, audience Q&A, and public address broadcasts"
      badge="Stage 01 Active"
      currentUser={currentUser}
      onUpdateStatus={handleUpdateStatus}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BroadcastStage
            speakerName="Clara Oswald"
            speakerTitle="VP of Operations & Strategy"
            presentationTitle="Q3 Organizational Alignment & Spatial Roadmap"
            viewerCount={viewerCount}
            isHandRaised={isHandRaised}
            onToggleHandRaise={handleToggleHandRaise}
          />
        </div>

        <div className="lg:col-span-1">
          <BroadcastQa
            questions={questions}
            onSubmitQuestion={handleSubmitQuestion}
            onUpvoteQuestion={handleUpvoteQuestion}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
