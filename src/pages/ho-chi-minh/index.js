import React from 'react'
import Link from 'gatsby-link'
import getSlug from 'speakingurl'

const createDistrictName = districtName => {
  if (isNaN(districtName)) return districtName
  else return `Quận ${districtName}`
}

const SaiGon = ({ data }) => {
  const locations = data.allLocationsXlsxSheet1
  const getSlugOptions = {
    lang: 'vn',
  }

  return (
    <div className="container">
      <h6 className="s-title">{`Danh sách các quận đã có cửa hàng ở Sài Gòn với tổng số cửa hàng là ${
        locations.totalCount
      }`}</h6>
      <ul>
        {locations.distinct
          .sort((a, b) => a.toLowerCase() > b.toLowerCase())
          .map(item => (
            <li key={item}>
              <Link to={`/ho-chi-minh/${getSlug(item, getSlugOptions)}`}>
                {createDistrictName(item)}
              </Link>
            </li>
          ))}
      </ul>
      <hr />
      <Link to="/">Trang chủ</Link>
    </div>
  )
}

export default SaiGon

export const SaiGonQuery = graphql`
  query SaiGonQuery {
    allLocationsXlsxSheet1(filter: { city: { eq: "Hochiminh City" } }) {
      totalCount
      distinct(field: district)
    }
  }
`
