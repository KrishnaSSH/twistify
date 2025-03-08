# Twistify

A free and open-source API that provides random tongue twisters! Send a simple GET request and get a fun tongue twister in response.

## Features
- Get a **random tongue twister**.
- Retrieve a **specific tongue twister by ID**.
- Get **multiple random tongue twisters** at once.
- Completely **free and open-source**.

##  Endpoints

### 1. Get a Random Tongue Twister
```http
GET /twister
```
### Response

```json
{
    "id": 2,
    "text": "How many boards Could the Mongols hoard If the Mongol hordes got bored?"
}
```
---

### 2. Get a Specific Tongue Twister by ID

```http
GET /twister/:id
```
### Example
```http
GET /twister/1
```
### Response
```json
{
    "id": 1,
    "text": "I saw Susie sitting in a shoe shine shop. Where she sits she shines, and where she shines she sits."
}
```

---

### 3. Get Multiple Random Tongue Twisters

```http
GET /twisters?count=3
```

```json
[
    { "id": 4, "text": "Send toast to ten tense stout saints' ten tall tents." },
    { "id": 1, "text": "I saw Susie sitting in a shoe shine shop..." },
    { "id": 0, "text": "Peter Piper picked a peck of pickled peppers..." }
]
```
---

### If you want to contribute feel free to fork it and send a Pull Request 💖 
### This Project is MIT Liscensed