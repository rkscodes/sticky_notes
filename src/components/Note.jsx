import { forwardRef } from "react"
const Note = forwardRef(function ({ content, initialPos, ...props }, ref) {
	return <div
		ref={ref}
		style={{
			position: "absolute",
			left: `${initialPos?.x}px`,
			top: `${initialPos?.y}px`,
			border: "1px solid black",
			userSelect: "none",
			padding: "10px",
			width: "200px",
			cursor: "move",
			backgroundColor: "#fff176",
		}}
		{...props}
	>
		📌 {content}
	</div>
})

export { Note }