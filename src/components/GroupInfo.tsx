import React from 'react';
import '../styles/components/GroupInfo.scss';

interface Member {
  id: string;
  name: string;
  avatar?: string;
}

interface GroupInfoProps {
  groupName: string;
  groupId: string;
  members: Member[];
  maxMembers?: number;
}

const GroupInfo: React.FC<GroupInfoProps> = ({
  groupName,
  groupId,
  members,
  maxMembers = 6,
}) => {
  return (
    <div className="group-info">
      <h3>{groupName}</h3>
      <p className="group-id">ID: {groupId}</p>
      <div className="members-section">
        <h4>Członkowie ({members.length}/{maxMembers})</h4>
        <div className="members-list">
          {members.map((member) => (
            <div key={member.id} className="member">
              <img
                src={member.avatar || '/default-avatar.png'}
                alt={member.name}
                className="member-avatar"
              />
              <span>{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupInfo;
