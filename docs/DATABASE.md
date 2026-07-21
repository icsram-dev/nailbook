# Database Design

## User

Leírás:
A rendszer minden felhasználója.

### Fields

| Field | Type | Required | Notes |
|--------|------|----------|-------|
| id | CUID | ✅ | Primary Key |
| name | String | ✅ | Teljes név |
| email | String | ✅ | Egyedi |
| phone | String | ❌ | Telefonszám |
| passwordHash | String | ❌ | Auth.js kompatibilis |
| role | ADMIN / CUSTOMER | ✅ | Jogosultság |
| createdAt | DateTime | ✅ | Automatikus |
| updatedAt | DateTime | ✅ | Automatikus |

---

## Service

Leírás:
Foglalható szolgáltatások.

### Fields

| Field | Type | Notes |
|--------|------|------|
| id | CUID | PK |
| name | String | |
| duration | Int | perc |
| price | Int | Ft |
| active | Boolean | Soft delete |
| createdAt | DateTime | |
| updatedAt | DateTime | |

---

## Appointment

Leírás:
Időpontfoglalás.

### Fields

| Field | Type |
|--------|------|
| id | CUID |
| customerId | User |
| serviceId | Service |
| startTime | DateTime |
| endTime | DateTime |
| price | Int |
| status | Enum |
| note | String? |
| createdAt | DateTime |
| updatedAt | DateTime |

Status:

- PENDING
- CONFIRMED
- CANCELLED
- COMPLETED
- NO_SHOW

---

## OpeningHour

- dayOfWeek
- startTime
- endTime
- isClosed

---

## Vacation

- startDate
- endDate
- reason