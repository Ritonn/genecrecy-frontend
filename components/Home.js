import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import PersonNode from '../components/PersonNode';

const Tree = dynamic(() => import('react-d3-tree').then(mod => mod.default || mod.Tree), { ssr: false });

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

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Tree
        data={[treeData]}
        orientation="horizontal"
        collapsible={false}
        translate={{ x: 200, y: 400 }}
        nodeSize={{ x: 260, y: 100 }}
        renderCustomNodeElement={({ nodeDatum }) => (
          <PersonNode nodeDatum={nodeDatum} />
        )}
        zoomable={true}
        initialZoom={0.7} // optionnel : zoom de départ
        zoomExtent={[0.2, 2.5]} // <-- augmente le zoom max autorisé
        separation={{ siblings: 1, nonSiblings: 2 }}
      />
    </div>
  );
}

export default Home;
