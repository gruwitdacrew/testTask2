import './App.css';
import Button from './Components/Button/Button.tsx';
import Node from './Components/Node/Node.tsx';
import { NodeData } from './Components/Node/Node.tsx';
import { useState } from 'react';

let nodesCount = 0;

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [editValue, setEditValue] = useState<string | null>(null);
  const [nodes, setNodes] = useState<NodeData[]>([]);

  function updateRec(nodes: NodeData[], parentId: number, updateAction)
  {
    return nodes.map(node =>
    {
      if (node.id === parentId) return updateAction(node);
      else if (node.children.length > 0) return {...node, children: updateRec(node.children, parentId, updateAction)};
      else return node;
    });
  }

  const saveNode = (node: NodeData | null, editValue: string) => {
    if (node === null) alert("Выберите Node");
    else
    {
      setNodes(nodes => {
        if (node.parent == null) return nodes.map(curNode => curNode.id === node.id ? {...curNode, name: editValue} : curNode);
        else return updateRec(nodes, node.parent.id, (parent: NodeData) => { return {...parent, children: parent.children.map(curNode => curNode.id === node.id ? {...curNode, name: editValue} : curNode)}});
      });
      setEditValue(null);
    }
  };

  const editNode = (node: NodeData | null) => {
    if (node === null) alert("Выберите Node");
    else setEditValue(node.name);
  };

  const removeNode = (node: NodeData | null) => {
    if (node === null) alert("Выберите Node");
    else
    {
      setNodes(nodes => {
        if (node.parent == null) return nodes.filter(curNode => curNode.id !== node.id);
        else return updateRec(nodes, node.parent.id, (parent: NodeData) => { return {...parent, children: parent.children.filter(curNode => curNode.id !== node.id)}});
      });

      setSelectedNode(null);
    }
  };

  const addNode = (parent: NodeData | null) => {
    const newNode: NodeData = {
      id: ++nodesCount,
      name: `Node ${nodesCount.toString()}`,
      parent: parent,
      children: []
    };

    setNodes(nodes => {
      if (newNode.parent == null) return nodes.concat(newNode);
      else return updateRec(nodes, newNode.parent.id, (parent: NodeData) => { return {...parent, children: parent.children.concat(newNode)}});
    });
  };

  return (
    <div className='container'>
      <div className='tree'>
        <div className='panel' style={{borderBottom: '2px solid green'}}>
          Tree
        </div>
        <div style={{flex: 1}} className='nodesContainer'>{
          nodes.map(node => 
            <Node key={node.id} data={node} editValue={editValue} setEditValue={setEditValue} selectedNodeId={selectedNode?.id} setSelectedNode={setSelectedNode}/>
          )
        }</div>
        <div className='panel' style={{borderTop: '2px solid green'}}>
          <Button actionName='Add' onClick={ () => { editValue == null ? addNode(selectedNode) : alert("Завершите редактирование") } }></Button>
          <Button actionName='Remove' onClick={ () => { editValue == null ? removeNode(selectedNode) : alert("Завершите редактирование") } }></Button>
          { editValue != null ? 
            <Button actionName='Save' onClick={ () => { saveNode(selectedNode, editValue); } }></Button> : 
            <Button actionName='Edit' onClick={ () => { editNode(selectedNode); } }></Button> 
          }
          <Button actionName='Reset' onClick={ () => { setNodes([]); setSelectedNode(null); setEditValue(null); nodesCount = 0; } }></Button>
        </div>
      </div>
    </div>
  );
}

export default App;
