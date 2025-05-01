import styles from './PersonNode.module.css';

const PersonNode = ({ person, people, generation = 0 }) => {
  const children = people.filter(p => p.parentId === person.id);

  const generationClass = styles[`gen${generation}`] || styles.gen4; // fallback

  return (
    <div style={{ marginLeft: generation * 20 }}>
      <div className={`${styles.person} ${generationClass}`}>
        👤 {person.name}
        {person.spouse && <> & ❤️ {person.spouse}</>}
      </div>

      {children.map(child => (
        <PersonNode
          key={child.id}
          person={child}
          people={people}
          generation={generation + 1}
        />
      ))}
    </div>
  );
};
