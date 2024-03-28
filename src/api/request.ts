import myAxios from "@/api/myAxios";

/*
 * @ api {get} /knowledge_base/list_knowledge_bases 列出文档库
 * return data
 */
export const list_knowledge_bases = () => {
  return myAxios.get('knowledge_base/list_knowledge_bases')
}

/*
 * @ api {post} /knowledge_base/create_knowledge_base 新建知识库
 * @ param knowledge_base_name
 * @ param vector_store_type: 'faiss'(注意目前只支持这个)
 * @ param embed_model: 'm3e-base'(注意目前只支持这个)
 * return null
 */
export const create_knowledge_base = (knowledge_base_name: string, vector_store_type: string, embed_model: string) => {
  let params = new URLSearchParams();
  params.append('knowledge_base_name', knowledge_base_name)
  params.append('vector_store_type', vector_store_type)
  params.append('embed_model', embed_model)
  return myAxios.post('knowledge_base/create_knowledge_base', params)
}

/*
 * @ api {get} /knowledge_base/list_files
 * @ param knowledge_base_name
 * return data 文件名称
 */
export const list_files = (knowledge_base_name: string) => {
  return myAxios.get('knowledge_base/list_files?knowledge_base_name=' + knowledge_base_name)
}

/*
 * @ api {post} /knowledge_base/delete_knowledge_base 删除知识库
 * @ param knowledge_base_name
 * return null
 */
export const delete_knowledge_base = (knowledge_base_name:string) => {
  return myAxios.post('knowledge_base/delete_knowledge_base', knowledge_base_name)
}

/*
 * @ api {post} /knowledge_base/upload_docs 上传文件
 * return data: failed_files
 */
export const upload_docs = (files: [], knowledge_base_name: string, chunk_size: number, chunk_overlap: number) => {
  let params = new FormData();
  params.append('files', files.toString())
  params.append('knowledge_base_name', knowledge_base_name)
  params.append('chunk_size', chunk_size.toString())
  params.append('chunk_overlap', chunk_overlap.toString())
  return myAxios.post('knowledge_base/upload_docs', params)
}

/*
 * @ api {post} /knowledge_base/list_file_detail 显示每个文档的参数
 * @ param knowledge_base_name
 * return data : [{kb_name, file_name, file_ext, file_version, document_loader, docs_count, text_splitter, create_time, No}]
 */
export const list_file_detail = (knowledge_base_name: string) => {
  return myAxios.post('knowledge_base/list_file_detail', knowledge_base_name)
}

/*
 * @ api {post} /knowledge_base/delete_docs 删除文件
 * @ param knowledge_base_name
 * @ param file_names
 * @ delete_content:True(需要前端传True，如果为False则删除数据库记录但不删除真实⽂件)
 * return data: failed_files
 */
export const delete_docs = (knowledge_base_name: string, file_names: string[], delete_content: boolean) => {
  let params = new URLSearchParams();
  params.append('knowledge_base_name', knowledge_base_name)
  params.append('file_names', file_names.toString())
  params.append('delete_content', delete_content.toString())
  return myAxios.post('knowledge_base/delete_docs', params)
}

/*
 * @ api {post} /llm_model/list_running_models 列出可用模型列表
 */
export const list_running_models = () => {
  return myAxios.post('llm_model/list_running_models')
}

/*
 * @ api {post} /chat/paper_upload 选择喜欢的⽂章导⼊某⼀知识库
 * @ param files: [{title, id}]
 * @ param knowledge_base_name
 * @ param override
 * @ param to_vector_store
 * @ param chunk_size
 * @ param chunk_overlap
 * @ param zh_title_enhance
 */
export const paper_upload = (files: {title: string, id: string}[], knowledge_base_name: string, chunk_size: number, chunk_overlap: number) => {
  let params = new URLSearchParams();
  params.append('files', files.toString())
  params.append('knowledge_base_name', knowledge_base_name)
  params.append('override', 'false')
  params.append('to_vector_store', 'true')
  params.append('chunk_size', chunk_size.toString())
  params.append('chunk_overlap', chunk_overlap.toString())
  params.append('zh_title_enhance', 'false')
  return myAxios.post('chat/paper_upload', params)
}


