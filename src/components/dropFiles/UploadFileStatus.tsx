import React from 'react'

type Props = {
  fileName?: string;
  progress?: number; // 0..100
  visible?: boolean;
  onCancel?: () => void;
}

const UploadFileStatus = ({ fileName = 'Uploading...', progress = 0, visible = false, onCancel }: Props) => {
  if (!visible) return null;
  return (
    <div className='w-full max-w-2xl mx-auto bg-black/20 rounded-lg p-4'>
      <div className='flex justify-between mb-2 text-sm'>
        <span className='font-medium'>{fileName}</span>
        <span>{Math.max(0, Math.min(100, Math.round(progress)))}%</span>
      </div>
      <div className='h-2 w-full bg-white/20 rounded'>
        <div className='h-2 bg-yellow-400 rounded' style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
      </div>
      <div className='flex justify-between mt-2 text-xs opacity-80'>
        <span>Uploading</span>
        {onCancel && (
          <button className='underline' onClick={onCancel}>Cancel</button>
        )}
      </div>
    </div>
  )
}

export default UploadFileStatus
