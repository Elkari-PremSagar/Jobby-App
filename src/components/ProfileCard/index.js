import './index.css'

const ProfileCard = ({profileData}) => {
  const {name, profileImageUrl, shortBio} = profileData

  return (
    <div className="profile-card">
      <img src={profileImageUrl} alt="profile" />
      <h1>{name}</h1>
      <p>{shortBio}</p>
    </div>
  )
}
export default ProfileCard
