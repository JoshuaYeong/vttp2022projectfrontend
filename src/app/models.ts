export interface User {
    username: string,
    password: string
}

export interface JwtResponse {
    token: string,
    username: string
}

export interface Search {
    query: string,
    limit: number
}

export interface Flat {
    _id: number,
    month: string,
    town: string,
    flatType: string,
    block?: string
    streetName: string,
    storeyRange?: string,
    floorArea: number,
    flatModel?: string,
    leaseCommenceDate: number,
    resalePrice: number,
}

    // "records": [{"town": "SENGKANG", "flat_type": "5 ROOM", "_full_count":
    // "15781", "flat_model": "Improved", "floor_area_sqm": "110", "street_name":
    // "SENGKANG EAST WAY", "resale_price": "400000", "rank": 0.158137, "month":
    // "2017-02", "remaining_lease": "82 years 07 months", "lease_commence_date":
    // "2000", "storey_range": "16 TO 18", "_id": 1941, "block": "122A"},
