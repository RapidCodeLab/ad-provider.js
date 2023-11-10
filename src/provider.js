let endpoint = "http://127.0.0.1:8080/http://127.0.0.1:3060/rtb/v1"

let entities = document.body.querySelectorAll("[data-entity-id]")

let entity_ids = []

entities.forEach(entity => {
  entity_ids.push(entity.dataset.entityId)
})

let reqBody = {}
reqBody.entities = entity_ids;

(async (nodes) => {
  
  let payloads = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(res => {
      return res.payloads
    })
    .catch(e => console.log(e));
  
  
  payloads.forEach(payload => {
    const result = Array.from(nodes)
      .find((node) => node.dataset.entityId === payload.entity_id);
    result.innerHTML += payload.adm
  })
})(entities)
