import { Link } from 'react-router-dom'
import type {ArticleProps} from "../types/ArticleProps"

function ArticleCard(props:ArticleProps) {
    return (
            <div className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <Link to={`/articles/${props.id}`} className="text-xl font-bold text-blue-600 hover:underline">
                    {props.title}
                </Link>
                <br />
                {props.summary}
            </div>
    )
}

export default ArticleCard