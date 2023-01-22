interface ProgressBarProps {
    progress:number
}

export const ProgressBar =(props:ProgressBarProps)=>{
    
    return(
        <div className='h-3 rounded-xl bg-zinc-700 w-full mt-4'>
        <div 
        role="progressbar"
        className='h-3 max-w-full rounded-xl bg-violet-600 transition-all'
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={props.progress} 
        style={{width: `${props.progress}%`,}}/>
    </div>
    )
}