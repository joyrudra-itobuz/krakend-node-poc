# Steps to Run KrakenD

### 1. Clone the Repository

```bash
git clone <repo-url>
```

### 2. Navigate to the KrakenD Directory

```bash
cd /path/to/repo/krakend
```

### 3. Install Dependencies

#### Run the following command to install all dependencies:

```bash
yarn
```

### 4. Start the Development Server

#### Start KrakenD with the following command:

```bash
docker run -p 8080:8080 -v $PWD:/etc/krakend/ devopsfaith/krakend run --config /etc/krakend/krakend.json
```

### 6. Test the /public/users Endpoint

#### Use curl to test if the KrakenD instance is running correctly:

```bash
curl localhost:8080/public/users
```
