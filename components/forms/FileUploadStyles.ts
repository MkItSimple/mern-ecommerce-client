import styled from 'styled-components'; export const FileUploadStyles = styled.div`
.badges_container {
    display: block;
  width: fit-content;
  min-width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge {
    width: 70px;
    position: relative;
    display: inline-block;
    margin-right: .2em;
}
img {
    width: 100%;
}

.btn {
    padding: .7em 2em;
    display: inline-block;
}
.upload_btn, .reset_images_btn {
    text-transform: none;
    display: inline-block;
    width: auto;
}
.upload_btn {
    background-color: black;
    color: white;
}

.remove {
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    background-color: #565656;
    padding: .3em .2em .0em .2em;
    opacity: .5;
    &:hover {
        cursor: pointer;
        opacity: 1;
    }
}
`