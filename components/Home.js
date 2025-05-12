import styles from '../styles/Home.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PersonNode from '../components/PersonNode';

const Tree = dynamic(() => import('react-d3-tree').then(mod => mod.default || mod.Tree), {ssr: false,});

function Home() {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    async function fetchTree() {
      const res = await fetch('http://localhost:3000/api/arbre/681e6c6a7c81c7ebb080b91e');
      const data = await res.json();
      setTreeData(data);
    }

    fetchTree();
  }, []);

  if (!treeData) return <p>Chargement de l’arbre…</p>;

  console.log('treeData', treeData)

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Tree
        data={[treeData]}
        orientation="horizontal"
        collapsible={false}
        translate={{ x: 100, y: 200 }}
        nodeSize={{ x: 120, y: 60 }}
        renderCustomNodeElement={({ nodeDatum }) => (
          <PersonNode nodeDatum={nodeDatum} />
        )}
      />
    </div>
  );
}

export default Home;
