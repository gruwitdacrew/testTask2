import './Node.css';

export interface NodeData {
  id: number
  name: string
  parent: NodeData | null
  children: NodeData[]
}

export interface NodeProps {
  data: NodeData
  editValue: string | null
  setEditValue
  selectedNodeId: number | undefined
  setSelectedNode
}

function Node({ data, selectedNodeId, setSelectedNode, editValue, setEditValue }: NodeProps) {
  return (
    <div>
      <div className='node' style={{backgroundColor: selectedNodeId === data.id ? "gray" : ""}} onClick={() => { if (editValue == null) setSelectedNode(data); else if (selectedNodeId !== data.id) alert("Завершите редактирование"); }}>
        { selectedNodeId === data.id && editValue != null ? <input onChange={(e) => setEditValue(e.target.value)} value={editValue} /> : data.name }
      </div>
      <div className='nodeChildren'>{
        data.children.map(node => 
          <Node key={node.id} data={node} editValue={editValue} setEditValue={setEditValue} selectedNodeId={selectedNodeId} setSelectedNode={setSelectedNode}/>
        )
      }</div>
    </div>
  );
}

export default Node;